import { Layout, Typography } from "antd";

const { Paragraph, Link: StyledLink } = Typography;

export const Footer: React.FC = () => {
  return (
    <Layout.Footer style={footerStyle}>
      <Typography>
        <Paragraph style={{ color: "#fff" }}>
          Этот сайт не используется в коммерческих целях и создан в качестве
          тестового задания для Сани =) Если вы являетесь владельцем авторских
          прав на какой-либо контент, размещенный на данном сайте, и считаете,
          что ваши права были нарушены, пожалуйста, обратитесь по адресу{" "}
          <StyledLink href={`mailto:askabelka.as@gmail.com`}>
            askabelka.as@gmail.com
          </StyledLink>
        </Paragraph>
      </Typography>
    </Layout.Footer>
  );
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  backgroundColor: "#555",
};
