// Term data structure
export interface Term {
    id: string;
    name: string;
    communeId: string
}

export interface AddTerm {
    id: string;
    name: string;
    communeId: string[] 
}
