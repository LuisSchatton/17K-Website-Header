import { create } from "zustand";

const useStore = create((set) => ({
    hover: false,
    toggleHover: () => set((state) => ({ hover: !state.hover })),

    interaktionsGestaltung: false,
    toggleInteraktionsGestaltung: () => set((state) => ({ interaktionsGestaltung: !state.interaktionsGestaltung})),
    interaktionsGestaltungHover: false,
    toggleInteraktionsGestaltungHover: () => set((state) => ({ interaktionsGestaltungHover: !state.interaktionsGestaltungHover})),
    
    creativeCoding: false,
    toggleCreativeCoding: () => set((state) => ({ creativeCoding: !state.creativeCoding})),
    creativeCodingHover: false,
    toggleCreativeCodingHover: () => set((state) => ({ creativeCodingHover: !state.creativeCodingHover})),
    
    informationDesign: false,
    toggleInformationDesign: () => set((state) => ({ informationDesign: !state.informationDesign})),
    informationDesignHover: false,
    toggleInformationDesignHover: () => set((state) => ({ informationDesignHover: !state.informationDesignHover})),
    
    technologie: false,
    toggleTechnologie: () => set((state) => ({ technologie: !state.technologie})),
    technologieHover: false,
    toggleTechnologieHover: () => set((state) => ({ technologieHover: !state.technologieHover})),

    konzept: false,
    toggleKonzept: () => set((state) => ({ konzept: !state.konzept})),
    konzeptHover: false,
    toggleKonzeptHover: () => set((state) => ({ konzeptHover: !state.konzeptHover}))
}));



export default useStore;
