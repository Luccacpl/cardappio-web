import { Spinner, Content, Wrapper, FlexCol } from './style'

const Loader = () => (
  <Wrapper height="100vh" alignItems="flex-end" justifyContent="center">
    <Content height="65%">
      <FlexCol justifyContent="center" alignItems="center" flex="1">
        <Spinner />
      </FlexCol>
    </Content>
  </Wrapper>
)

export default Loader
