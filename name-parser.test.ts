import { NameParser } from "./name-parser";

test.each([
  {
    name: "John Doe",
    result: {
      salutation: "",
      firstName: "John",
      initials: "",
      lastName: "Doe",
      suffix: "",
    },
  },
  {
    name: "Mr Anthony R Von Fange III",
    result: {
      salutation: "Mr.",
      firstName: "Anthony",
      initials: "R",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "Sara Ann Fraser",
    result: {
      salutation: "",
      firstName: "Sara Ann",
      initials: "",
      lastName: "Fraser",
      suffix: "",
    },
  },
  {
    name: "Adam",
    result: {
      salutation: "",
      firstName: "Adam",
      initials: "",
      lastName: "",
      suffix: "",
    },
  },
  {
    name: "Jonathan Smith",
    result: {
      salutation: "",
      firstName: "Jonathan",
      initials: "",
      lastName: "Smith",
      suffix: "",
    },
  },
  {
    name: "Anthony Von Fange III",
    result: {
      salutation: "",
      firstName: "Anthony",
      initials: "",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "Mr John Doe",
    result: {
      salutation: "Mr.",
      firstName: "John",
      initials: "",
      lastName: "Doe",
      suffix: "",
    },
  },
  {
    name: "Smarty Pants Phd",
    result: {
      salutation: "",
      firstName: "Smarty",
      initials: "",
      lastName: "Pants",
      suffix: "PhD",
    },
  },
  {
    name: "Mark P Williams",
    result: {
      salutation: "",
      firstName: "Mark",
      initials: "P",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "Jack O'Neill",
    result: {
      salutation: "",
      firstName: "Jack",
      initials: "",
      lastName: "O'Neill",
      suffix: "",
    },
  },
  {
    name: "Jack o Neill",
    result: {
      salutation: "",
      firstName: "Jack",
      initials: "",
      lastName: "O Neill",
      suffix: "",
    },
  },
  {
    name: "Jack O Neill",
    result: {
      salutation: "",
      firstName: "Jack",
      initials: "O",
      lastName: "Neill",
      suffix: "",
    },
  },
  {
    name: "James Norrington",
    result: {
      salutation: "",
      firstName: "James",
      initials: "",
      lastName: "Norrington",
      suffix: "",
    },
  },
  {
    name: "Hans Christian Anderssen",
    result: {
      salutation: "",
      firstName: "Hans Christian",
      initials: "",
      lastName: "Anderssen",
      suffix: "",
    },
  },
  {
    name: "Mr Anthony R Von Fange III",
    result: {
      salutation: "Mr.",
      firstName: "Anthony",
      initials: "R",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "J. B. Hunt",
    result: {
      salutation: "",
      firstName: "J.",
      initials: "B.",
      lastName: "Hunt",
      suffix: "",
    },
  },
  {
    name: "Edward Senior III",
    result: {
      salutation: "",
      firstName: "Edward",
      initials: "",
      lastName: "Senior",
      suffix: "III",
    },
  },
  {
    name: "Edward Dale Senior II",
    result: {
      salutation: "",
      firstName: "Edward",
      initials: "",
      lastName: "Dale",
      suffix: "Senior II",
    },
  },
  {
    name: "Dale Edward Jones Senior",
    result: {
      salutation: "",
      firstName: "Dale Edward",
      initials: "",
      lastName: "Jones",
      suffix: "Senior",
    },
  },
  {
    name: "Jason Rodriguez Sr.",
    result: {
      salutation: "",
      firstName: "Jason",
      initials: "",
      lastName: "Rodriguez",
      suffix: "Sr",
    },
  },
  {
    name: "Jason Senior",
    result: {
      salutation: "",
      firstName: "Jason",
      initials: "",
      lastName: "Senior",
      suffix: "",
    },
  },
  {
    name: "Bill Junior",
    result: {
      salutation: "",
      firstName: "Bill",
      initials: "",
      lastName: "Junior",
      suffix: "",
    },
  },
  {
    name: "Sara Ann Fraser",
    result: {
      salutation: "",
      firstName: "Sara Ann",
      initials: "",
      lastName: "Fraser",
      suffix: "",
    },
  },
  {
    name: "Adam",
    result: {
      salutation: "",
      firstName: "Adam",
      initials: "",
      lastName: "",
      suffix: "",
    },
  },
  {
    name: "OLD MACDONALD",
    result: {
      salutation: "",
      firstName: "Old",
      initials: "",
      lastName: "Macdonald",
      suffix: "",
    },
  },
  {
    name: "James van Allen",
    result: {
      salutation: "",
      firstName: "James",
      initials: "",
      lastName: "Van Allen",
      suffix: "",
    },
  },
  {
    name: "Jimmy (Bubba) Smith",
    result: {
      salutation: "",
      firstName: "Jimmy",
      initials: "",
      lastName: "Smith",
      suffix: "",
    },
  },
  {
    name: "Miss Jennifer Shrader Lawrence",
    result: {
      salutation: "Ms.",
      firstName: "Jennifer Shrader",
      initials: "",
      lastName: "Lawrence",
      suffix: "",
    },
  },
  {
    name: "Dr. Jonathan Smith",
    result: {
      salutation: "Dr.",
      firstName: "Jonathan",
      initials: "",
      lastName: "Smith",
      suffix: "",
    },
  },
  {
    name: "Ms. Jamie P. Harrowitz",
    result: {
      salutation: "Ms.",
      firstName: "Jamie",
      initials: "P.",
      lastName: "Harrowitz",
      suffix: "",
    },
  },
  {
    name: "Mr John Doe",
    result: {
      salutation: "Mr.",
      firstName: "John",
      initials: "",
      lastName: "Doe",
      suffix: "",
    },
  },
  {
    name: "Rev. Dr John Doe",
    result: {
      salutation: "Rev. Dr.",
      firstName: "John",
      initials: "",
      lastName: "Doe",
      suffix: "",
    },
  },
  {
    name: "Prof. Tyson J. Hirthe",
    result: {
      salutation: "Prof.",
      firstName: "Tyson",
      initials: "J.",
      lastName: "Hirthe",
      suffix: "",
    },
  },
  {
    name: "prof Eveline Aufderhar",
    result: {
      salutation: "Prof.",
      firstName: "Eveline",
      initials: "",
      lastName: "Aufderhar",
      suffix: "",
    },
  },
  {
    name: "Anthony Von Fange III",
    result: {
      salutation: "",
      firstName: "Anthony",
      initials: "",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "Smarty Pants Phd",
    result: {
      salutation: "",
      firstName: "Smarty",
      initials: "",
      lastName: "Pants",
      suffix: "PhD",
    },
  },
  {
    name: "Mark Peter Williams",
    result: {
      salutation: "",
      firstName: "Mark Peter",
      initials: "",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "Mark P Williams",
    result: {
      salutation: "",
      firstName: "Mark",
      initials: "P",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "Mark P. Williams",
    result: {
      salutation: "",
      firstName: "Mark",
      initials: "P.",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "M Peter Williams",
    result: {
      salutation: "",
      firstName: "Peter",
      initials: "M",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "M. Peter Williams",
    result: {
      salutation: "",
      firstName: "Peter",
      initials: "M.",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "M. P. Williams",
    result: {
      salutation: "",
      firstName: "M.",
      initials: "P.",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "The Rev. Mark Williams",
    result: {
      salutation: "Rev.",
      firstName: "Mark",
      initials: "",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "Mister Mark Williams",
    result: {
      salutation: "Mr.",
      firstName: "Mark",
      initials: "",
      lastName: "Williams",
      suffix: "",
    },
  },
  {
    name: "Fraser, Joshua",
    result: {
      salutation: "",
      firstName: "Joshua",
      initials: "",
      lastName: "Fraser",
      suffix: "",
    },
  },
  {
    name: "Mrs. Brown, Amanda",
    result: {
      salutation: "Mrs.",
      firstName: "Amanda",
      initials: "",
      lastName: "Brown",
      suffix: "",
    },
  },
  {
    name: "Mr.\r\nPaul\rJoseph\nMaria\tWinters",
    result: {
      salutation: "Mr.",
      firstName: "Paul Joseph Maria",
      initials: "",
      lastName: "Winters",
      suffix: "",
    },
  },
  {
    name: "Van Truong",
    result: {
      salutation: "",
      firstName: "Van",
      initials: "",
      lastName: "Truong",
      suffix: "",
    },
  },
  {
    name: "John Van",
    result: {
      salutation: "",
      firstName: "John",
      initials: "",
      lastName: "Van",
      suffix: "",
    },
  },
  {
    name: "Mr. Van Truong",
    result: {
      salutation: "Mr.",
      firstName: "Van",
      initials: "",
      lastName: "Truong",
      suffix: "",
    },
  },
  {
    name: "Anthony Von Fange III, PHD",
    result: {
      salutation: "",
      firstName: "Anthony",
      initials: "",
      lastName: "Von Fange",
      suffix: "III PhD",
    },
  },
  {
    name: "Jimmy (Bubba Junior) Smith",
    result: {
      salutation: "",
      firstName: "Jimmy",
      initials: "",
      lastName: "Smith",
      suffix: "",
    },
  },
  {
    name: "Jonathan Smith, MD",
    result: {
      salutation: "",
      firstName: "Jonathan",
      initials: "",
      lastName: "Smith",
      suffix: "MD",
    },
  },
  {
    name: "Kirk, James T.",
    result: {
      salutation: "",
      firstName: "James",
      initials: "T.",
      lastName: "Kirk",
      suffix: "",
    },
  },
  {
    name: "James B",
    result: {
      salutation: "",
      firstName: "James",
      initials: "",
      lastName: "B",
      suffix: "",
    },
  },
  {
    name: "Williams, Hank, Jr.",
    result: {
      salutation: "",
      firstName: "Hank",
      initials: "",
      lastName: "Williams",
      suffix: "Jr",
    },
  },
  {
    name: "Sir James Reynolds, Junior",
    result: {
      salutation: "Sir.",
      firstName: "James",
      initials: "",
      lastName: "Reynolds",
      suffix: "Junior",
    },
  },
  {
    name: "Sir John Paul Getty Sr.",
    result: {
      salutation: "Sir.",
      firstName: "John Paul",
      initials: "",
      lastName: "Getty",
      suffix: "Sr",
    },
  },
  {
    name: "etna übel",
    result: {
      salutation: "",
      firstName: "Etna",
      initials: "",
      lastName: "Übel",
      suffix: "",
    },
  },
  {
    name: "Markus Müller",
    result: {
      salutation: "",
      firstName: "Markus",
      initials: "",
      lastName: "Müller",
      suffix: "",
    },
  },
  {
    name: "Charles Dixon (20th century)",
    result: {
      salutation: "",
      firstName: "Charles",
      initials: "",
      lastName: "Dixon",
      suffix: "",
    },
  },
  {
    name: "Smith, John Eric",
    result: {
      salutation: "",
      firstName: "John Eric",
      initials: "",
      lastName: "Smith",
      suffix: "",
    },
  },
  {
    name: "PAUL M LEWIS MR",
    result: {
      salutation: "",
      firstName: "Paul",
      initials: "M",
      lastName: "Lewis Mr",
      suffix: "",
    },
  },
  {
    name: "SUJAN MASTER",
    result: {
      salutation: "",
      firstName: "Sujan",
      initials: "",
      lastName: "Master",
      suffix: "",
    },
  },
  {
    name: "Tiptree, James, Jr",
    result: {
      salutation: "",
      firstName: "James",
      initials: "",
      lastName: "Tiptree",
      suffix: "Jr",
    },
  },
  {
    name: "Miller, Walter M., Jr.",
    result: {
      salutation: "",
      firstName: "Walter",
      initials: "M.",
      lastName: "Miller",
      suffix: "Jr",
    },
  },
  {
    name: "Tiptree, James Jr.",
    result: {
      salutation: "",
      firstName: "James",
      initials: "",
      lastName: "Tiptree",
      suffix: "Jr",
    },
  },
  {
    name: "Miller, Walter M. Jr.",
    result: {
      salutation: "",
      firstName: "Walter",
      initials: "M.",
      lastName: "Miller",
      suffix: "Jr",
    },
  },
  {
    name: "Thái Quốc Nguyễn",
    result: {
      salutation: "",
      firstName: "Thái Quốc",
      initials: "",
      lastName: "Nguyễn",
      suffix: "",
    },
  },
  {
    name: "Yumeng Du",
    result: {
      salutation: "",
      firstName: "Yumeng",
      initials: "",
      lastName: "Du",
      suffix: "",
    },
  },
  {
    name: "Yumeng Du",
    result: {
      salutation: "",
      firstName: "Yumeng",
      initials: "",
      lastName: "Du",
      suffix: "",
    },
  },
  {
    name: "Charles Philip Arthur George Mountbatten-Windsor",
    result: {
      salutation: "",
      firstName: "Charles Philip Arthur George",
      initials: "",
      lastName: "Mountbatten-Windsor",
      suffix: "",
    },
  },
  {
    name: "Ella Marija Lani Yelich-O'Connor",
    result: {
      salutation: "",
      firstName: "Ella Marija Lani",
      initials: "",
      lastName: "Yelich-O'Connor",
      suffix: "",
    },
  },
])("Check Name: %s", ({ name, result }) => {
  expect(NameParser.parse(name)).toMatchObject(result);
});
