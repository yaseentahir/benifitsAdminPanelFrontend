import {
  CalendarIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  //{ name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "Home Cards", href: "/homecards", icon: UsersIcon, current: false },
  {
    name: "Company Links On Home",
    href: "/companylinks",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Company Cards",
    href: "/companycards",
    icon: FolderIcon,
    current: false,
  },
  { name: "Claims", href: "/claims", icon: CalendarIcon, current: false },
  { name: "Faqs", href: "/faqs", icon: DocumentDuplicateIcon, current: false },
  {
    name: "Groups",
    href: "/groups",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Protection",
    href: "/protection",
    icon: LockClosedIcon,
    current: false,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: EnvelopeIcon,
    current: false,
  },
];

export { navigation };
