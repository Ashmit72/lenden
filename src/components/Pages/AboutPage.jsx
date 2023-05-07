import styled from "styled-components";



function AboutPage() {
  return (
      <div style={{paddingTop:"1rem"}} >
    <Container>
      
      <Title>LenDen</Title>
      
      <Content>
        <TextContainer>
          <Text>
          LenDen is a transaction management application. It is a digital platform where users can record their daily transaction.The aplication facilitates its users to store transactions with various parties locally.  The app enables its users to add different parties with whom they want to do transactions and record the transaction details.Later, they can view those details in a separate page containing the avilable parties. Moreover,recieve and pay amounts are calculated by the application that makes it easier  to sort out transaction with the parties. In addition to that, the app facilitates report generation in pdf format which can be downloaded locally and printed for convenience view. Now creating separate ledger is not needed as it can be created digitally with additional features and hassle free approach.
          </Text>
        </TextContainer>
        <ImageContainer>
          <ImageLink target="_blank" href="https://reflexitsolution.com/">
            <Image
              src="https://www.freepnglogos.com/uploads/google-play-png-logo/get-it-on-google-play-google-play-badge-png-logos-23.png"
              alt="Image 1"
            />
          </ImageLink>
          <ImageLink target="_blank" href="https://reflexitsolution.com/">
            <Image
              src="https://www.pngmart.com/files/10/Download-On-The-App-Store-PNG-Image.png"
              alt="Image 2"
            />
          </ImageLink>
        </ImageContainer>
      </Content>
    </Container>
      </div>
  );
}
export default AboutPage;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;


  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align:justify;
  @media(max-width:768px){
    font-size:12px;
    line-height:1.7;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex: auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const ImageLink = styled.a`
  flex: 1;
  margin-right: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  display: inline-block;
  max-width: 100%;
  height: auto;
`;