import React from 'react';
import { render } from '@testing-library/react-native'
import { HistoryCard } from './'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('HistoryCard component', () => {
    it('should render correctly', () => {
        const { getByTestId } = render(
            <HistoryCard
                testID='history-card'
                amount='12'
                color={theme.colors.shape}
                title='Some title'
            />,
            {
                wrapper: Providers
            })

        const historyCardComponent = getByTestId('history-card')
        expect(historyCardComponent.props.style[0].borderLeftColor).toEqual(theme.colors.shape)

    })
})

