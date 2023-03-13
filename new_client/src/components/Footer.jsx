import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      {/* <Container> */}
        <Row>
          <Column>
            <Heading>Creators</Heading>
            <FooterLink target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/huy-trinh-9868ba194/">Huy Trinh</FooterLink>
            <FooterLink target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/antoniliriasala/">Antoni Liria-Sala</FooterLink>
            <FooterLink target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tianyangwillli/">William Li</FooterLink>
            <FooterLink target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/irvinyang/">Guangyu Yang</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Buying Details</FooterLink>
            <FooterLink href="#">Selling Details</FooterLink>
            <FooterLink href="#">Service Overview</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Contact Information</FooterLink>
          </Column>
        </Row>
      {/* </Container> */}
    </Box>
  );
};
export default Footer;