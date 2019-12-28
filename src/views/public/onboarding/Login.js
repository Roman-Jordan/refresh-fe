// IMPORTS
// react
import React, { useContext } from "react";
// contexts
import { UserContext } from "../../../contexts/UserContext";
// styled components
import styled from "styled-components";
// images
import fblogo from "../../../images/Onboarding/facebook_round_transparent_logo.svg";
import emailogo from "../../../images/Onboarding/email.svg";
import googlelogo from "../../../images/Onboarding/google_icon_round_color.svg";
import waves from "../../../images/Onboarding/waves.svg";
//cube elements
import cubes from "../../../images/Onboarding/red_purple_cubes.svg";
// components
import Row from "../../../components/atoms/row/row";
import Col from "../../../components/atoms/col/col";
import Text from "../../../components/atoms/text/text";
import Image from "../../../components/atoms/image/image";

// COMPONENT
const Login = props => {
  // contexts
  const activeUser = useContext(UserContext);

  //routes
  const routeToHome = e => {
    e.preventDefault();
    props.history.push("/");
  };

  const routeToSignUp = e => {
    e.preventDefault();
    props.history.push("/signup");
  };

  const routeToEmailLogIn = e => {
    e.preventDefault();
    props.history.push("/emaillogin");
  };

  //Or for Row variable -atoms styling
  const colText = "OR";

  //FaceBook or Google auth
  const auth = e => {
    //Open Popup and declare Size
    window.open(
      `https://refresh-yo-beta.herokuapp.com/${e.target.name}`,
      "Sign In With Facebook ;)",
      "width=400,height=500"
    );
    window.addEventListener(
      "message",
      response => {
        authSuccess(response.data); // e.data hold the message
      },
      false
    );
  };

  const authSuccess = userObject => {
    userObject = JSON.parse(userObject);
    console.log(userObject);
    localStorage.setItem("token", userObject.token);
    if (activeUser.user_id === null) {
      activeUser.setUser({
        ...activeUser,
        user_id: userObject.user_profile.user_id || null,
        display_name: userObject.user_profile.display_name || "",
        fname: userObject.user_profile.fname || "",
        lname: userObject.user_profile.lname || "",
        cohort: userObject.user_profile.cohort || "",
        section_lead: userObject.user_profile.section_lead || "",
        avatar: userObject.user_profile.avatar || "",
        bio: userObject.user_profile.bio || "",
        new_user: userObject.user_profile.newUser ? true : false
      });

      localStorage.setItem(
        "activeUser",
        JSON.stringify(userObject.user_profile)
      );
    } else {
      activeUser.setUser(...activeUser);
      localStorage.setItem(
        "activeUser",
        JSON.stringify(userObject.user_profile)
      );
    }
    {
      userObject.newUser === true
        ? props.history.push("/firstlogin")
        : props.history.push("/dashboard");
    }
  };

  return (
    <OnBoardContainer>
      <TopHolder>
        <ButtonNoColor onClick={routeToHome}>&lt;</ButtonNoColor>
        <ButtonNoColor onClick={routeToSignUp}>Sign Up</ButtonNoColor>
      </TopHolder>
      <HeaderHolder>
        <Header>
          Welcome <br /> Back.
        </Header>
        <Cubes src={cubes} />
      </HeaderHolder>
      <FlexHolder>
        <FBButton name="facebookAuth" onClick={auth}>
          Log In with Facebook{" "}
          <Image src={fblogo} height={2} width={2} borderRadius={100} />{" "}
        </FBButton>
        <GoogleSignIn name="googleAuth" onClick={auth}>
          Log In with Google{" "}
          <Image
            src={googlelogo}
            alt={"google image"}
            height={2}
            width={2}
            borderRadius={100}
          />
        </GoogleSignIn>
      </FlexHolder>
      <Row width={97} height={1} padding={"12% 0"}>
        <Col width={30} marginLeft={-2}>
          <Text fontSize={"1.6rem"} color={"#CFCDFF"} text={colText}></Text>
        </Col>
        <Col
          width={70}
          borderBottom={"1px solid white"}
          height={1}
          marginTop={1}
          marginBottom={3}
          marginLeft={-6}
        ></Col>
      </Row>
      <FlexHolder>
        <Button onClick={routeToEmailLogIn}>
          Log In with Email <Image src={emailogo} height={2} width={2} />
        </Button>
      </FlexHolder>
    </OnBoardContainer>
  );
};

// STYLED COMPONENTS
const OnBoardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: #4742bc;
  background-image: url(${waves});
`;
const OnBoardContainer = styled.div`
font-family: "Catamaran", sans-serif;
display:flex;
width: 100vw;
height: 100vh;
max-height: 100vh;
background-color: #4742bc;
background-image: url(${waves});
overflow-x: hidden;
flex-direction:column;
justify-content:space-between;
align-items: flex-start
line-height: 1.5;
padding:10%;
&:nth-child(*){
  margin-bottom:5%;
}
`;

const Header = styled.h1`
  margin-right: 3rem;
  font-weight: bold;
  font-size: calc(110% + 6.7vw);
  line-height: 6.6rem;
  letter-spacing: 3.5px;
  color: #ffffff;

  @media screen and (min-width: 950px) {
    margin-top: -60px;
    line-height: 8rem;
  }

  @media screen and (min-width: 1250px) {
    line-height: 11rem;
    margin-top: -100px;
  }
`;
const HeaderHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 10%;
`;

const FlexHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: flex-start;
  width: 100%;

  @media screen and (min-width: 750px) {
    margin-top: -60px;
  }

  @media screen and (min-width: 900px) {
    margin-top: -90px;
  }
`;

const TopHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 100%;
`;

const Button = styled.a`
display: flex;
justify-content: space-around;
border-radius: 0.5rem;
padding: 1.5rem 0;
width:84%;
text-align:center;
margin: auto;
background: #E05CB3;
color: white;
font-size: calc(110% + 0.5vw);
letter-spacing:0.1rem;
}
`;

const FBButton = styled.a`
  display: flex;
  justify-content: space-around;
  border-radius: 0.5rem;
  padding: 1.5rem 0;
  width: 84%;
  text-align: center;
  margin: 16% auto 2%;
  background: #4a639e;
  color: white;
  font-size: calc(110% + 0.5vw);
  letter-spacing: 0.1rem;

  @media screen and (min-width: 1500px) {
    margin-bottom: -30px;
  }
`;

const GoogleSignIn = styled.a`
  display: flex;
  justify-content: space-around;
  border-radius: 0.5rem;
  padding: 1.5rem 0.8rem;
  width: 84%;
  text-align: center;
  margin: 5% auto;
  background: #6997f2;
  color: white;
  font-size: calc(110% + 0.5vw);
  letter-spacing: 0.1rem;
`;

const ButtonNoColor = styled.a`
  font-size: calc(110% + 0.5vw);
  font-style: medium;
  color: #ccc9ff;
`;
const Cubes = styled.img`
  max-width: 20%;
  width: 100%;
  height: auto;
  margin: auto;
  padding-top: 3rem;

  @media screen and (min-width: 950px) {
    margin-top: -60px;
  }

  @media screen and (min-width: 1250px) {
    margin-top: -100px; 
  }
`;

const Logo = styled.img``;

// EXPORT
export default Login;
