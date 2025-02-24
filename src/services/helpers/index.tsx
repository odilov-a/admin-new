import {
  AppstoreOutlined,
  TranslationOutlined,
  LineChartOutlined,
  BookOutlined,
  UserAddOutlined,
  BellOutlined,
} from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

const settingslist = [
  { id: 1, title: "O'zbekcha", shortName: "O'z" },
  { id: 2, title: "Русский", shortName: "Ру" },
  { id: 3, title: "English", shortName: "En" },
  { id: 4, title: "Settings", shortName: "St" },
  { id: 5, title: "Tests", shortName: "TC" },
];

const menuItems: MenuItem[] = [
  {
    key: "problems",
    label: "Masalalar",
    icon: <AppstoreOutlined />,
    route: "/problems",
  },
  {
    key: "students",
    label: "O'quvchilar",
    icon: <UserAddOutlined />,
    route: "/students",
  },
  {
    key: "teachers",
    label: "O'qituvchilar",
    icon: <UserAddOutlined />,
    route: "/teachers",
  },
  {
    key: "difficulties",
    label: "Qiyinliklar",
    icon: <LineChartOutlined />,
    route: "/difficulties",
  },
  {
    key: "subjects",
    label: "Fanlar",
    icon: <BookOutlined />,
    route: "/subjects",
  },
  {
    key: "charts",
    label: "Hisobotlar",
    icon: <LineChartOutlined />,
    route: "/charts",
  },
  {
    key: "feedbacks",
    label: "Fikrlar",
    icon: <BellOutlined />,
    route: "/feedbacks",
  },
  {
    key: "translations",
    label: "Tarjimalar",
    icon: <TranslationOutlined />,
    route: "/translations",
  },
];

function gen4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}

export default {
  menuItems,
};

export { gen4, settingslist };
