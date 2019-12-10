import React, { useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { QueryContext } from '../../../app/context/QueryContext'
import FadeIn from '../../../components/FadeIn'
import Flex from '../../../components/Flex'
import { VerticalSpacer } from '../../../components/Spacer'
import { H6 } from '../../../components/Typography'
import { ReactComponent as SearchIcon } from '../../../static/search-icon.svg'
import { TokenMetadata } from '../../../types/Tokens'
import { SearchLabel } from '../styles'
import Container, { SearchInputProps } from './Container'
import SearchInputItem from './SearchInputItem'
import {
  DropdownContainer,
  DropdownContent,
  IconContainer,
  InputContainer,
  InputEl,
  SearchInputContainer,
  TokenTypeHeaderContainer,
} from './styles'

function SearchInput(props: SearchInputProps) {
  const searchInputRef = useRef<HTMLDivElement>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [stablecoinTokens, setStablecoinTokens] = useState<TokenMetadata[]>(props.stablecoinTokens)
  const [allOtherTokens, setAllOtherTokens] = useState<TokenMetadata[]>(props.allOtherTokens)
  const { tokens, addToken, removeToken } = useContext(QueryContext)

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setSearchString(evt.target.value)
  }

  const onEnter = (evt: React.FormEvent) => {
    evt.preventDefault()
    addToken(searchString)
  }

  const handleClickOutside = (evt: MouseEvent) => {
    if (evt.target instanceof HTMLDivElement) {
      if (searchInputRef.current && !searchInputRef.current.contains(evt.target)) {
        setShowDropdown(false)
      }
    }
  }

  const selectToken = (tokenSymbol: string) => {
    addToken(tokenSymbol)
    setShowDropdown(false)
  }

  const onInputFocus = () => {
    setShowDropdown(true)
  }

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  useEffect(() => {
    // console.log(tokens)
  }, [tokens])

  useEffect(() => {
    setStablecoinTokens(props.stablecoinTokens)
  }, [props.stablecoinTokens])

  useEffect(() => {
    setAllOtherTokens(props.allOtherTokens)
  }, [props.allOtherTokens])

  return (
    <SearchInputContainer ref={searchInputRef}>
      <SearchLabel>
        <FormattedMessage defaultMessage="Filter by token" />
      </SearchLabel>
      <InputContainer onSubmit={onEnter} showDropdown={showDropdown}>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <InputEl
          value={searchString}
          onChange={onChange}
          onFocus={onInputFocus}
          // onBlur={() => setShowDropdown(false)}
        />
      </InputContainer>
      <DropdownContainer showDropdown={showDropdown}>
        <DropdownContent showDropdown={showDropdown}>
          {stablecoinTokens.length > 0 && (
            <TokenTypeHeaderContainer>
              <H6 expand color="white" textAlign="left">
                <FormattedMessage defaultMessage="Stablecoins" />
              </H6>
            </TokenTypeHeaderContainer>
          )}
          {stablecoinTokens.map(token => (
            <SearchInputItem
              key={token.address}
              title={token.symbol}
              description={token.name}
              image={token.airswap_img_url || token.cmc_img_url}
              onClick={() => selectToken(token.symbol)}
            />
          ))}
          <VerticalSpacer units={4} />
          {allOtherTokens.length > 0 && (
            <TokenTypeHeaderContainer>
              <H6 expand color="white" textAlign="left">
                <FormattedMessage defaultMessage="Other tokens" />
              </H6>
            </TokenTypeHeaderContainer>
          )}
          {allOtherTokens.map(token => (
            <SearchInputItem
              key={token.address}
              title={token.symbol}
              description={token.name}
              image={token.airswap_img_url || token.cmc_img_url}
              onClick={() => selectToken(token.symbol)}
            />
          ))}
        </DropdownContent>
      </DropdownContainer>
    </SearchInputContainer>
  )
}

export default Container(SearchInput)
