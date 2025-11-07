import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

export interface LocalStore {
    // values
    theme: Theme;

    // functions
    toggleTheme: () => void;
}

export const useLocalStore = create<LocalStore>()(
    persist(
        (set) => ({
            // initial values
            theme: 'dark',

            // setters
            toggleTheme: () => {
                set((state) => ({
                    ...state,
                    theme: state.theme === 'dark' ? 'light' : 'dark',
                }));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
