import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionStore {
    loaded: boolean;
    effectsReduced: boolean;

    updateLoaded: (flag: boolean) => void;
    updateEffectsReduced: (flag: boolean) => void;
}

export const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            loaded: false,
            effectsReduced: false,

            updateLoaded: (newLoaded: boolean) => {
                set((state) => ({
                    ...state,
                    loaded: newLoaded,
                }));
            },

            updateEffectsReduced: (newEffectsReduced: boolean) => {
                set((state) => ({
                    ...state,
                    effectsReduced: newEffectsReduced,
                }));
            },
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
