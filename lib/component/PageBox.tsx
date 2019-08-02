import React, {FunctionComponent, ReactNode, useContext, forwardRef} from 'react'
import {PageBoxContext} from '../context/pagebox-context'
import {Paginator} from './Paginator'

export const PageBoxComponent: FunctionComponent<Props> = props => {
  const paginationProps = useContext(PageBoxContext)
  return (
    <>
      {props.children}
      <Paginator {...paginationProps} onPage={props.onPage}/>
    </>
  )
}

export const PageBox = forwardRef<any, Props>(PageBoxComponent)

export type PaginationContainerRefAttribute = {
  selectAll(e: Event): void
  get(all): void
}

type Props = {
  onPage(page: number): void
  children: ReactNode
}
