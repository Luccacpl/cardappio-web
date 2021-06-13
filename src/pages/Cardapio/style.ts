import styled from "styled-components";

interface IDragFileArea {
    justifyContent?: string
    alignItems?: string
    margin?: string
    flexDirection?: string
    width?: string
}

const DragFileArea = styled.div<IDragFileArea>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin: ${(props) => props.margin};
  flex-direction: ${(props) => props.flexDirection};
  width: ${(props) => props.width};
  background: #2C2C2C;
  height: 150px;
  border: 2px dashed #7A7A7A;
  border-radius: 4px;
  width: 55%;
  cursor: pointer;
`;


export { DragFileArea };
