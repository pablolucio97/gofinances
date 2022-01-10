import React from 'react'
import {FlatList} from 'react-native'
import { categories } from '../../utils/categories'
import {
    Container,
    Header,
    Title,
    Category,
    Name,
    Icon,
    Separator,
    Footer,

} from './styles'

import { Button } from '../../components/Forms/Button'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (name: Category) => void;
    closeSelectCategory: () => void;
}


export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props) {

    function handleCategorySelect(category: Category) {
        setCategory(category)
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                keyExtractor={(item ) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Button label="Selecionar" onPress={closeSelectCategory}/>
            </Footer>
        </Container>
    )
}
