import styled from 'styled-components'

const TableWithTabs = styled.div`
  height: 100%;
  width: 100%;
  padding: 55px 45px 0px 45px;
`

const Body = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 3rem;
  display: flex;
  /* flex-direction: row; */
  background: #202020;
  border-radius: 5px;
`

const TabsContainer = styled.div`
  height: 3.2rem;
  background: white;
  display: flex;
  position: relative;
  top: -55px;
  left: -45px;
`

const CardsContainer = styled.div`
  height: calc(100% - -47px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0px;
}

`

export { TableWithTabs, Body, TabsContainer, CardsContainer }