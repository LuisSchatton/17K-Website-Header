import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware';

const useStoreScroll = create(
    subscribeWithSelector((set, get) => ({
        scrollPosition: 0,
        getScrollPosition: () => {return get().scrollPosition},
        setScrollPosition: (newScrollPosition) => set({ scrollPosition: newScrollPosition }),
    }))
)

export default useStoreScroll;