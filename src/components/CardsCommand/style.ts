import styled from "styled-components";

import { colors } from "../../utils/colors";
import { dimensions } from "../../utils/dimensions";
import { fontsSizes } from "../../utils/fontSizes";

interface DivCardProps {
  gridStart?: string;
  display?: string;
  width?: string;
  marginLeft?: string;
  margin?: string;
}

interface DivPictureProps {
  imgUrl?: string;
}

interface DivMenuProps {}

interface DivDetailProps {}

interface TitleCardProps {}

interface DescriptionCardProps {}

interface PriceCardProps {}

const DivCard = styled.div<DivCardProps>`
  width: fit-content;
  min-width: 210px;
  max-height: 300px;
  background-color: ${colors.lightBlack};
  border-radius: 5px;
  grid-column-start: ${(props) => props.gridStart};
  display: ${(props) => props.display};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  @media (min-width: 1480px) {
    width: fit-content;
    height: 33%;
  }
`;

const DivPicture = styled.div<DivPictureProps>`
  height: 160px;
  width: 100%;
  background-color: grey;
  border-radius: 5px;
  background: url(${(props) => props.imgUrl});
  background-position: center;
  background-size: cover;
  /* background-color: white; */
`;

const DivMenu = styled.div<DivMenuProps>`
  width: 145px;
  height: 40px;
  background-color: ${colors.menuOrange};
  border-radius: 0px 5px 0px 10px;
  float: right;
  top: 0;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  display: flex;
`;

const DivDetail = styled.div<DivDetailProps>`
  height: fit-content;
  width: ${dimensions.widthFull};
  background-color: black;
  padding: 20px;
`;

const TitleCard = styled.h2<TitleCardProps>`
  font-size: ${fontsSizes.medium16};
  font-weight: 500;
  color: ${colors.white};

  @media screen and (max-width: 1412px) {
    font-size: ${fontsSizes.small12};
  }

  @media screen and (min-width: 1413px) and (max-width: 1455px) {
    font-size: ${fontsSizes.small14};
  }
`

const DescriptionCard = styled.p<DescriptionCardProps>`
  font-size: ${fontsSizes.small12};
  font-weight: 500;
  color: #888888;
`;

const PriceCard = styled.h1<PriceCardProps>`
  font-size: ${fontsSizes.large24};
  font-weight: bold;
  color: ${colors.green};
  margin-left: ${fontsSizes.large22};

  @media screen and (max-width: 1412px) {
    font-size: ${fontsSizes.medium16};
  }

  @media screen and (min-width: 1413px) and (max-width: 1455px) {
    font-size: ${fontsSizes.large18};
  }
`;

export {
  DivCard,
  DivPicture,
  DivMenu,
  DivDetail,
  TitleCard,
  DescriptionCard,
  PriceCard,
};
