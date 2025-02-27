import { useAppSelector } from "@/app/hook"; // Redux থেকে ডাটা নিতে
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu; // Import SubMenu component

interface MenuItem {
  key: string;
  label: React.ReactNode;
  children?: MenuItem[];
}

// 🔹 Admin Routes
const adminSidebarItems: MenuItem[] = [
  {
    key: "1",
    label: <NavLink to="/dashboard">Profile</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/dashboard/users">Manage Users</NavLink>,
  },

  {
    key: "20",
    label: <NavLink to="/dashboard/users">Manage Products</NavLink>,
    children: [
      {
        key: "3",
        label: <NavLink to="/dashboard/create">Add Product</NavLink>,
      },
      {
        key: "4",
        label: <NavLink to="/dashboard/products">All Products</NavLink>,
      },
    ],
  },

  {
    key: "10",
    label: "Manage Order",
    // Create a SubMenu for "Manage Order"
    children: [
      {
        key: "9",
        label: <NavLink to="/dashboard/order">Order</NavLink>,
      },
    ],
  },
];

// 🔹 User Routes
const userSidebarItems: MenuItem[] = [
  {
    key: "1",
    label: <NavLink to="/dashboard">Profile</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/dashboard/view-order">Order List</NavLink>,
  },
];

const MainLayout = () => {
  // ✅ Redux থেকে লগইন করা ইউজারের তথ্য আনছি
  const { user } = useAppSelector((state) => state.auth);

  // 🔥 ইউজারের রোল অনুযায়ী মেনু আইটেম সেট করা
  const sidebarItems: MenuItem[] =
    user?.role === "admin" ? adminSidebarItems : userSidebarItems;

  return (
    <Layout style={{ height: "100%" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="">
            <NavLink to="/">
              <h1 className="font-bold text-xl">Car Shop</h1>
            </NavLink>
          </div>
        </div>

        {/* ✅ ডায়নামিকভাবে মেনু দেখাচ্ছি */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {sidebarItems.map((item) => {
            if (item.children) {
              // If the item has sub-menu, render SubMenu
              return (
                <SubMenu key={item.key} title={item.label}>
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
          })}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className=""
            style={{
              padding: 24,
              minHeight: 688,
            }}
          >
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default MainLayout;
