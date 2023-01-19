import React from 'react'
import {PropTypes} from 'prop-types'
import styles from './styles.module.scss'
import Select, {components} from 'react-select'

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <div className={styles.round}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label htmlFor="checkbox"></label>
          {props.label}
        </div>
      </components.Option>
    </div>
  );
};

function Dropdown(props) {
  const {title = '', name = '', disabled = false, value = undefined, onChange = null, itens, isMulti = false, className} = props

  return (
    <Select
      isMulti={isMulti}
      placeholder={title}
      value={value}
      onChange={onChange}
      options={itens}
      disabled={disabled}
      name={name}
      className={`${styles.select} ${className}`}
      hideSelectedOptions={isMulti && false}
      components={isMulti ? {Option} : null}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: 'transparent;',
          borderColor: state.isFocused && !isMulti ? 'var(--hover-blue);' : 'var(--black)!important;',
          borderBottom: state.menuIsOpen && !isMulti ? '1px solid transparent;' : '1px solid var(--hover-blue);',
          borderRadius: state.menuIsOpen ? '4px 4px 0px 0px;': '4px;',
          boxShadow: '0!important',
          '&:hover': {
            border: !state.menuIsOpen && '1px solid var(--hover-blue)!important;',
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--background-color);',
          border: isMulti ? '1px solid var(--black)' : '1px solid var(--hover-blue);',
          borderTop: 'none;',
          boxShadow: '0!important;',
          marginTop: '0px;',
          borderRadius: '0px 0px 4px 4px'
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--background-color);',
          borderRadius: '0px 0px 4px 4px',
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: 'var(--background-color);',
          color: 'var(--black)',
          '&:hover': {
            color: 'var(--hover-blue);',
            cursor: 'pointer;',
            backgroundColor: 'var(--gray);'
          }
        })
      }}
    />
  )
}

Dropdown.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.boolean,
  value: PropTypes.any,
  onChange: PropTypes.event,
  itens: PropTypes.array,
  isMulti: PropTypes.boolean
}

Option.propTypes = {
  isSelected: PropTypes.boolean,
  label: PropTypes.string
}

export default Dropdown
