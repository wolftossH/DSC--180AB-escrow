import styled from 'styled-components';
   
export const Box = styled.div`
  padding: 40px 40px;
  background: #11192e;
  position: bottom;
  bottom: 0;
  width: 100%;
   
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;
   
export const Container = styled.div`
    // display: flex;
    flex-direction: column;
    justify-content: left;
    max-width: 1000px;
    margin: 0 auto;
    /* background: black */
`;
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;
   
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 100px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
   
export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 5px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: #897a9b;
      transition: 200ms ease-in;
  }
`;
   
export const Heading = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: bold;
`;
