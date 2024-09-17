import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'

const useStore = create(
    subscribeWithSelector((set, get) => ({

        scrollPosition: 0,
        getScrollposition: () => {return get().scrollPosition},
        setScrollposition: (newScrollPosition) => {
            set({ scrollPosition: newScrollPosition })
        }

    })
    )
)

export default useStore;