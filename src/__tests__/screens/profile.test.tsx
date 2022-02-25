import React from 'react'
import { render } from '@testing-library/react-native'
import { Profile } from '../../screens/Profile'

it('should showns correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />)
    const inputName = getByPlaceholderText('Nome')
    expect(inputName.props.placeholder).toBeTruthy()
})

it('user value should be in the input', () => {
    const {getByTestId} = render(<Profile />)
    const inputName = getByTestId('test-name')
    expect(inputName.props.value).toEqual('Pablo')
})

it('should to render title coorectly', () => {
    const {getByTestId} = render(<Profile />)
    const title = getByTestId('test-title')
    expect(title.props.children).toContain('Profile')
})