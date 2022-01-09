import React from 'react'
import { categories } from '../../utils/categories'
import {
    Container,
    Header,
    Title,
    Category,
    CategoriesList,
    Name,
    Icon,
    Separator,
    Footer,

} from './styles'

import { Button } from '../../components/Forms/Button'

interface Category {
    key: string;
    value: string;
}

interface Props {
    category: string;
    setCategory: (name: Category) => void;
    closeSelectCategory: () => void;
}


export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <CategoriesList
                data={categories}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category>
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Button label="Selecionar" />
            </Footer>
        </Container>
    )
}
