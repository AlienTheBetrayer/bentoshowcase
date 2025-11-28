import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionStore {
    loaded: boolean;

    updateLoaded: (flag: boolean) => void;
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            loaded: false,

            updateLoaded: (newLoaded: boolean) => {
                set((state) => ({
                    ...state,
                    loaded: newLoaded,
                }));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
