const participants = [
  { name: "Alex", status: "confirmed" },
  { name: "Camille", status: "pending" },
  { name: "Jordan", status: "declined" },
  { name: "Sam", status: "confirmed" },
];

const statusOrder = {
  confirmed: 1,
  pending: 2,
  declined: 3,
};

export function getEventViewData() {
  return {
    title: "Soiree Gay'vent",
    event: {
      title: "Soiree Gay'vent",
      description: "Une soiree conviviale pour se rencontrer, discuter et partager un bon moment autour d'un verre.",
      imageUrl:
        "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YBgLV1KNJPi8RDRB/photo-de-fond-mv0LyEz0y0coVvNK.jpeg",
      participants: [...participants].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    },
  };
}

export function getCreateEventViewData() {
  return {
    title: "Creer un evenement",
    scripts: ["/js/create-event.js"],
  };
}
