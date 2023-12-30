export type TypeCollection = {
  name: string;
  links: string[];
  imgUrl: string;
};

export const listCollections: TypeCollection[] = [
  {
    name: "LinkHub",
    links: [
      "About us",
      "Invoices",
      "Legal",
      "Chat",
      "Files",
      "Design",
      "Code",
      "Data",
    ],
    imgUrl: "img/collection/link-hub.jpg",
  },
  {
    name: "NatureQuest",
    links: ["Invoices", "Legal"],
    imgUrl: "img/collection/nature-quest.jpg",
  },
  {
    name: "CyberPulse",
    links: ["About us", "Invoices", "Legal", "Chat", "Files"],
    imgUrl: "img/collection/cuber-pulse.jpg",
  },
];
