//IMPORTS
//react
import React, { useContext } from "react";
//styled components
import styled from "styled-components";
//images
import waves from "../../../images/Onboarding/waves.svg";
//logos
import emailogo from "../../../images/Onboarding/email.svg";
//cube elements
import cubes from "../../../images/Onboarding/red_purple_cubes.svg";
//atoms
import Row from "../../../components/atoms/row/row";
import Col from "../../../components/atoms/col/col";
import Text from "../../../components/atoms/text/text";
import Image from "../../../components/atoms/image/image";
//Context
import { UserContext } from "../../../contexts/UserContext";
import { missionMasher } from "../../globalFunctions";
import {AdminContext} from "../../../contexts/AdminContext"

const CreateAccount = props => {
  // contexts
  const activeUser = useContext(UserContext);
  const adminUser = useContext(AdminContext);
  //routes
  const routeToHome = e => {
    e.preventDefault();
    props.history.push("/");
  };

  const routeToLogin = e => {
    e.preventDefault();
    props.history.push("/login");
  };

  const routeToEmailSignUp = e => {
    e.preventDefault();
    props.history.push("/emailsignup");
  };

  const routeToAdminSignUp = e => {
    e.preventDefault();
    props.history.push("/admin")
  }

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
    console.log(userObject)
    const {
      mission_subscriptions,
      missions_in_progress
    } = userObject.user_missions;

    localStorage.setItem("token", userObject.token);
    {
      userObject.newUser
        ? props.history.push("/firstlogin")
        : props.history.push("/dashboard");
    }
  };

  //render
  return (
    <OnBoardContainer>
      <TopHolder>
        <ButtonNoColor className="arrow" onClick={routeToHome}>
          &lt;
        </ButtonNoColor>
        <ButtonNoColor onClick={routeToLogin}>Log In</ButtonNoColor>
      </TopHolder>
      <HeaderHolder>
        <Header>
          Create <br /> Account.
        </Header>
        <Cubes src={cubes} />
      </HeaderHolder>
      <FlexHolder>
        {/* <FBButton name="facebookAuth" onClick={auth}>
          Sign up with Facebook{" "}
          <Image src={fblogo} height={2} width={2} borderRadius={100} />{" "}
        </FBButton>
        <GoogleSignIn name="googleAuth" onClick={auth}>
          Sign up with Google{" "}
          <Image
            src={googlelogo}
            alt={"google image"}
            height={2}
            width={2}
            borderRadius={100}
          />
        </GoogleSignIn> */}
        
          <FlexWrapper>
            <p>OR</p>
            <div></div>
          </FlexWrapper>
       
        <Button onClick={routeToEmailSignUp}>
          Sign up with Email <Image src={emailogo} height={2} width={2} />
        </Button>
      </FlexHolder>
      {/* <FBButton onClick={routeToAdminSignUp}>
        Sign up as an Administrative
      </FBButton> */}
    </OnBoardContainer>
  );
};

// STYLED COMPONENTS
// const OnBoardWrapper = styled.div`
//   display: flex;
//   width: 100vw;
//   height: 100vh;
//   max-height: 100vh;
//   background-color: #4742bc;
//   background-image: url(${waves});
//   overflow-x: hidden;
// `;

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

  @media screen and (min-width: 700px) {
    font-size: calc(110% + 4vw);
    line-height: 5.2rem;
  }

  @media screen and (min-width: 1250px) {
    margin-top: -40px;
  }
`;
const HeaderHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 10%;
`;

const OnboardTxt = styled.p`
  margin: auto;
  font-size: 2rem;
  line-height: 33px;
  letter-spacing: 0.035em;
  color: #ccc9ff;
`;
const FlexHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: flex-start;
  width: 100%;
`;

const TopHolder = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  width: 100%;
  .arrow {
    font-size: calc(110% + 3vw);
  }
`;

const FlexWrapper = styled.div`
    margin:15% auto;
    display:flex;
    align-items:center;
    flex-direction:row;
    color:#fff;
    width:90%;
    div{
      border-bottom:.1rem solid #fff;
      margin:0 1rem;
      width:92%
    }
  @media screen and (min-width: 450px) {
    display: none;
  }
`

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
background: #4A639E;
color: white;
font-size: calc(110% + 0.5vw);
letter-spacing: 0.1rem;
`;

const GoogleSignIn = styled.a`
display: flex;
justify-content: space-around;
  border-radius: 0.5rem;
  padding: 1.5rem 0.8rem;
  width:84%;
  text-align:center;
  margin: 5% auto;
  background: #6997F2;
  color: white;
  font-size: calc(110% + 0.5vw);
  letter-spacing:0.1rem;
`;

const ButtonNoColor = styled.a`
  font-size: calc(110% + 0.5vw);
  font-style: medium;
  color: #ccc9ff;
`;
const Cubes = styled.img`
  max-width: 39%;
  width: 100%;
  height: auto;
  margin: auto;
  padding-top: 3rem;
`;

const Logo = styled.img``;

const GoogleLogo = styled(Logo)`
  border-radius: 50%;
`;

//EXPORT
export default CreateAccount;
