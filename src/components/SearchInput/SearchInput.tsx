import Svg from 'components/Svg/Svg'
import { dimensions } from 'utils'

import SearchSvg from '../../public/icons/search-outline.svg'

import { CustomInput, DivInput, SearchDiv, AddButton } from './style'

interface ISearchInput {
    placeholder?: string
    addButton?: string
    clickedAdd?: () => any
    onChange?: (e: any) => any
}

const SearchInput = (props: ISearchInput) => {
    return(
        <DivInput>
            <AddButton onClick={props.clickedAdd}>{props.addButton}</AddButton>
        </DivInput>
    );
}

export default SearchInput;