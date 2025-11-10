import React from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { initUpload, submitUploadMetadata } from "../../lib/api";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";

const UploadForm: React.FC = () => {
	const [type, setType] = React.useState<"text" | "audio" | "video">("text");
	const [file, setFile] = React.useState<File | null>(null);
	const [title, setTitle] = React.useState("");
	const [era, setEra] = React.useState("");
	const [tags, setTags] = React.useState("");
	const [submitting, setSubmitting] = React.useState(false);
	const queue = useOfflineQueue();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const { uploadId, signedUrl } = await initUpload();
			if (file && signedUrl) {
				await fetch(signedUrl, { method: "PUT", body: file });
			}
			await submitUploadMetadata(uploadId, {
				title,
				era,
				tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
				type,
			});
			alert("Upload submitted for moderation.");
		} catch {
			queue.enqueue({
				type: "uploadMetadata",
				payload: { data: { title, era, tags: tags.split(",").map((t) => t.trim()).filter(Boolean), type } },
			});
			alert("Offline: saved and will sync later.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Card>
			<form className="space-y-4" onSubmit={onSubmit}>
				<div className="font-semibold text-lg">Submit a Testimony</div>
				<div className="grid gap-3 md:grid-cols-2">
					<label className="text-sm">
						<span className="block text-gray-600">Type</span>
						<select className="w-full rounded-2xl border px-3 py-2" value={type} onChange={(e) => setType(e.target.value as any)}>
							<option value="text">Text</option>
							<option value="audio">Audio</option>
							<option value="video">Video</option>
						</select>
					</label>
					<label className="text-sm">
						<span className="block text-gray-600">Title</span>
						<input className="w-full rounded-2xl border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
					</label>
					<label className="text-sm">
						<span className="block text-gray-600">Era</span>
						<input className="w-full rounded-2xl border px-3 py-2" value={era} onChange={(e) => setEra(e.target.value)} placeholder="e.g., Post1994" />
					</label>
					<label className="text-sm">
						<span className="block text-gray-600">Tags (comma-separated)</span>
						<input className="w-full rounded-2xl border px-3 py-2" value={tags} onChange={(e) => setTags(e.target.value)} />
					</label>
				</div>
				{type !== "text" ? (
					<label className="block text-sm">
						<span className="block text-gray-600">Media File</span>
						<input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
					</label>
				) : null}
				<Button type="submit" disabled={submitting} className="w-full">
					{submitting ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Card>
	);
};

export default UploadForm;


