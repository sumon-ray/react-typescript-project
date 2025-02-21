import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/hook"; // Redux থেকে ডাটা নিতে
const { Header, Content, Footer, Sider } = Layout;

// 🔹 Admin Routes
const adminSidebarItems = [
  {
    key: "1",
    label: <NavLink to="/dashboard">Profile</NavLink>,
  },
  {
    key: "2",
    label: <NavLink to="/dashboard/users">manage users </NavLink>,
  },
  {
    key: "3",
    label: <NavLink to="/dashboard/create">Add Product</NavLink>,
  },
];

// 🔹 User Routes
const userSidebarItems = [
  {
    key: "1",
    label: <NavLink to="/dashboard">Profile</NavLink>,
  },
  {
    key: "2",  
    label: <NavLink to="/dashboard/order">Order List</NavLink>,
  },
  // {
  //   key: "3",  
  //   label: <NavLink to="/dashboard/my-profile">Profile</NavLink>,
  // },
 
];

const MainLayout = () => {
  // ✅ Redux থেকে লগইন করা ইউজারের তথ্য আনছি
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
console.log(user)
  // 🔥 ইউজারের রোল অনুযায়ী মেনু আইটেম সেট করা
  const sidebarItems = user?.role === "admin" ? adminSidebarItems : userSidebarItems;

  return (
    <Layout style={{ height: "100vh" }}>
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
        <NavLink to='/'>
          <h1 className="font-bold text-xl">Car Shop</h1>

            </NavLink>
        </div>
        </div>

        {/* ✅ ডায়নামিকভাবে মেনু দেখাচ্ছি */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {sidebarItems.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
