import { Outlet, useNavigation } from "react-router-dom";
import { Col, Layout, Row, Spin } from "antd";
import { Footer, Header } from "../components";
import useScrollToTop from "../utils/useScrollToTop";
import { CartProvider } from "../contexts/CartContext";

const { Content } = Layout;

export const Root: React.FC = () => {
  const navigation = useNavigation();
  useScrollToTop();
  return (
    <CartProvider>
      <Layout>
        <Header />
        <Layout>
          <Row justify="center">
            <Col span={20}>
              <Content style={{ minHeight: "90vh" }}>
                <Spin spinning={navigation.state === "loading"}>
                  <Outlet />
                </Spin>
              </Content>
            </Col>
          </Row>
        </Layout>
        <Footer />
      </Layout>
    </CartProvider>
  );
};
