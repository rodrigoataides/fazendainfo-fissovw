import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Space,
  Spin,
  message,
  notification,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { MaskedInput } from "antd-mask-input";
import {
  EyeInvisibleFilled,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";

export const Login = () => {
  const [responseType, setResponseType] = useState<String | null>();
  const [clienteId, setClienteId] = useState<String | null>();
  const [redirectUri, setRedirectUri] = useState<String | null>();
  const auth = useApi();
  const [loadOpen, setLoadOpen] = useState(false);
  const [msgLoad, setMsgLoad] = useState("");

  const signup = async (values: { cpf?: string; password?: string }) => {
    setMsgLoad("Autenticando usuário, aguarde...");
    setLoadOpen(true);
    if (values.cpf && values.password) {
      await auth
        .signin(values.cpf!, values.password!)
        .then((us: any) => {
          if (us != null && us.status) {
            notification.success({
              message: "Autênticação confirmada!",
              description: `Seja bem vindo ${us.user.name}!\nVocê será redirecionado para o sistema, aguarde.`,
            });
            //login autorizado
            window.location.href = `${redirectUri}?access_token=${us.token}`;
          } else {
            message.error("Usuário ou senha inválidos!");
          }
        })
        .catch((erro) => {
          notification.error({ message: erro.message });
        });
    } else {
      message.error("Usuário e senha são obrigatórios!");
    }
    setMsgLoad("");
    setLoadOpen(false);
  };

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    setResponseType(params.get("response_type"));
    setClienteId(params.get("client_id"));
    setRedirectUri(params.get("redirect_uri"));
  }, []);

  return (
    <>
      {responseType != undefined ? (
        <Spin
          spinning={loadOpen}
          tip={msgLoad}
          style={{ fontSize: 18, height: "100vh", width: "100vw" }}
        >
          <div className="container">
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 100,
              }}
              align={"middle"}
            >
              <Col
                style={{
                  border: "1px solid silver",
                  borderRadius: 8,
                  paddingTop: 5,
                  backgroundColor: "#82828288",
                }}
              >
                <Row
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img width={180} src={"/img/LOGO TELA LOGIN.png"} />
                </Row>
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "#FFF",
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  Login para {clienteId}
                </Row>
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* <CardFI title="Login de Usuários" size="100%">
                                    <h1>teste</h1>
                                </CardFI> */}
                  <Col span={20}>
                    <Form
                      name="formLogin"
                      onFinish={signup}
                      initialValues={{ remember: true }}
                    >
                      <Form.Item hidden name={"cliente_id"}>
                        <Input value={clienteId} />
                      </Form.Item>
                      <Form.Item
                        name={"cpf"}
                        rules={[
                          { required: true, message: "Cpf é obrigatório!" },
                        ]}
                      >
                        <MaskedInput
                          prefix={<UserOutlined />}
                          placeholder={"CPF do usuário"}
                          id="cpf"
                          mask={"000.000.000-00"}
                          required={true}
                        />
                      </Form.Item>
                      <Form.Item
                        name={"password"}
                        rules={[
                          { required: true, message: "A senha é obrigatória!" },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          placeholder="Senha do usuário"
                          iconRender={(visible: boolean) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleFilled />
                          }
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ width: "100%" }}
                          htmlType="submit"
                          type="primary"
                        >
                          Acessar
                        </Button>
                        {/* <Divider></Divider>
                                            Ou <NavLink to="/cadastrar/0" className={styles.planoContratarSel}>Cadastre-se agora!</NavLink> */}
                      </Form.Item>
                      <Form.Item style={{ width: "100%" }}>
                        {/*<Row
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                          >
                            <Checkbox>
                              <span style={{ color: "#fff", fontSize: 12 }}>
                                Relembre-me
                              </span>
                            </Checkbox>
                          </Form.Item>
                                          </Row>*/}
                        <Divider
                          style={{ marginTop: -10, marginBottom: -10 }}
                        />
                        <Row
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <a
                            className="login-form-forgot"
                            href=""
                            style={{ color: "#fff", fontSize: 12 }}
                          >
                            Esqueci minha senha
                          </a>
                        </Row>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <Footer
            style={{
              position: "fixed",
              bottom: -15,
              right: 10,
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: 12,
            }}
          >
            Fazenda Info ©2021 - Version: {process.env.APP_VERSION}
          </Footer>
        </Spin>
      ) : (
        <>
          <div className="container">
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 100,
              }}
              align={"middle"}
            >
              <Col
                style={{
                  border: "1px solid silver",
                  borderRadius: 8,
                  paddingTop: 5,
                  backgroundColor: "#82828288",
                }}
              >
                <Row
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img width={180} src={"/img/LOGO TELA LOGIN.png"} />
                </Row>
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "5px",
                    color: "#FFF",
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  Tentativa de
                </Row>
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                    color: "#FFF",
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  Acesso Indevido
                </Row>
                <Row
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: 15,
                    fontSize: 14,
                  }}
                >
                  <Col>
                    <Row>Percebemos uma anomalia no seu acesso.</Row>
                    <Row>Você tentou acessar o SSO diretamente,</Row>
                    <Row>e isso não é permitido.</Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
      <Footer
        style={{
          position: "fixed",
          bottom: -15,
          right: 10,
          backgroundColor: "transparent",
          color: "#fff",
          fontSize: 12,
        }}
      >
        Fazenda Info ©2021 - Version: {process.env.APP_VERSION}
      </Footer>
    </>
  );
};

export default Login;
