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
      <Container>
        <Row>
          <Column>
            <Heading>Creators</Heading>
            <FooterLink href="#">Huy Trinh</FooterLink>
            <FooterLink href="#">Antoni Liria-Sala</FooterLink>
            <FooterLink href="#">William Li</FooterLink>
            <FooterLink href="#">Guangyu Yang</FooterLink>
          </Column>
          <Column>
            <Heading>Services</Heading>
            <FooterLink href="#">Service Overview</FooterLink>
            <FooterLink href="#">Buying Details</FooterLink>
            <FooterLink href="#">Selling Details</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Contact Information</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;