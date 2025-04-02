import { getData } from "@/utils/termsApi";
import { Term } from "@/interfaces/Terms.interface";

// Commune data structure
export interface Commune {
    id: string;
    name: string;
    mapUrl: string;
}


// Commune data
export const communeData: Commune[] = [

    {
        id: "Comuna 1",
        name: "Comuna 1",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1sGtUBNn1t56F-_vN1VeBfTLqD4chOREw&ehbc=2E312F",
    },
    {
        id: "Comuna 2",
        name: "Comuna 2",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1yhzIKq2qRtst39cyyjdRf-3K5RulXZr2&ehbc=2E312F",
    },
    {
        id: "Comuna 3",
        name: "Comuna 3",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1kfVWDlnRBb7tg8CBa12o3KPOPUaKt4sG&ehbc=2E312F",
    },
    {
        id: "Comuna 4",
        name: "Comuna 4",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=12-F1xq5M3_vEd1GBFWdiwteEZtiQORlK&ehbc=2E312F",
    },
    {
        id: "Comuna 5",
        name: "Comuna 5",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=13K7BndeZl5plt5Yr_CZ5KZOznVSldQf9&ehbc=2E312FF",
    },
    {
        id: "Comuna 6",
        name: "Comuna 6",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1Dfkk95_HPtpsBDOwna606s3clZ_Jnfax&ehbc=2E312F",
    },
    {
        id: "Comuna 7",
        name: "Comuna 7",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1pb6yRMcQ0zbuf_vIqdFejKs4vZ-npMJK&ehbc=2E312F",
    },
    {
        id: "Comuna 8",
        name: "Comuna 8",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1wBKoV-ra23aHoaZ_7u64Md49XNAhcNMg&ehbc=2E312F",
    },
    {
        id: "Comuna 9",
        name: "Comuna 9",
        mapUrl:
            "https://www.google.com/maps/d/embed?mid=1S9Rvg4EQQ011fMVDf7Pv7B5j3nMkKgPq&ehbc=2E312F",
    },
];

const terms = await getData();
console.log('terms en data', terms)

export const termData: Term[] = terms;

