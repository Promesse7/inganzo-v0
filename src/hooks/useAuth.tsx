import React from "react";

type User = { uid: string; displayName?: string | null; email?: string | null };

const AuthContext = React.createContext<{ user: User | null }>({ user: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = React.useState<User | null>(null);
	React.useEffect(() => {
		// TODO: wire Firebase onAuthStateChanged(auth, setUser)
		setUser(null);
	}, []);
	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	return React.useContext(AuthContext);
}


