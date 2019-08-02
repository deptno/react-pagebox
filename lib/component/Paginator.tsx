import React, {FunctionComponent} from 'react'
import cx from 'classnames'
import {last, next, prev, range} from 'headless-paginator'

export const Paginator: FunctionComponent<Props> = props => {
  const pageClass = 'dib link hover-bg-light-blue f6 f5-ns b pa2 pointer'
  const {hasPrevPage, hasNextPage, limit = 25, page: pos, totalPage, totalCount: total, onPage} = props
  const {start, end} = range({
    total,
    limit,
    pos,
    range: props.range!
  })
  const max = last({total, limit})
  const children: JSX.Element[] = []
  const handlePrev = _ => onPage(prev({pos}))
  const handleNext = _ => onPage(next({total, limit, pos}))
  const handlePage = e => onPage(parseInt(e.target.textContent))
  const go = e => {
    e.preventDefault()
    const page = e.target.elements.namedItem('page').value
    onPage(page)
  }

  for (let i = start; i <= end; i++) {
    const current = i === pos
    children.push(
      <a
        className={cx(pageClass, {
          'white bg-blue pointer': current,
          'black-70': !current
        })}
        key={i}
        onClick={handlePage}
      >
        {i}
      </a>
    )
  }

  return (
    <div className="w-100 tc ">
      <nav className="cf pv3 relative">
        <div className="overflow-hidden center db">
          {hasPrevPage && <a className="link hover-bg-light-blue black f6 f5-ns b pa2 pointer" onClick={handlePrev}>이전</a>}
          {children}
          {hasNextPage && <a className="link hover-bg-light-blue black f6 f5-ns b pa2 pointer" onClick={handleNext}>다음</a>}
        </div>
        <form className="absolute pv3 top-0 right-1 flex" onSubmit={go}>
          <input
            type="number"
            min={1}
            max={max}
            className="input-reset ba b--black-60 pa2 w3"
            name="page"
          />
          <button className="button-reset bg-blue b white bn ba">
            페이지 바로 이동
          </button>
        </form>
      </nav>
    </div>
  )
}
Paginator.defaultProps = {
  hasPrevPage: false,
  hasNextPage: false,
  limit      : 25,
  page       : 1,
  totalPage  : 1,
  totalCount : 0,
  range      : 5
}

type Props = {
  hasPrevPage: boolean
  hasNextPage: boolean
  limit: number
  page: number
  totalPage: number
  totalCount: number
  range?: number
  onPage(page: number): void
}
