import React from 'react';
import { HihghlightCard } from './'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

describe('HighlightCard component', () => {



    it('should render correctly', () => {

        const { getByText, debug } = render(
            <HihghlightCard
                title='some title'
                amount='R$1000'
                lastTransaction='02/03/2022'
                type='down'
                testID='highlighcard-id'
            />, {
            wrapper: Providers
        }
        )

        debug()

        const highlightCard = getByText('some title')

        expect(highlightCard.props.style[0].backgroundColor).toEqual('#FFFFFF')
    })
}) 