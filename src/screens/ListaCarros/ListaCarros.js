import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importe os ícones desejados

export default function ListaCarros() {

    const [carros, setCarros] = useState(["Carro1", "Carro2"])
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [carroSendoEditado, setCarroSendoEditado] = useState(null)

    function adicionarCarro() {
        let novaListaCarros = [...carros] // Usar spread para criar uma nova cópia do array
        novaListaCarros.push(inputValue)
        setCarros(novaListaCarros)
        setCarroSendoEditado(null)
        setInputValue('')
    }

    function editarCarro() {
        let index = carros.indexOf(carroSendoEditado)
        let novaListaCarros = [...carros] // Usar spread para criar uma nova cópia do array
        novaListaCarros.splice(index, 1, inputValue)

        setCarros(novaListaCarros)
        setEditando(false)
        setInputValue('')
    }

    function excluirCarro(carro) {
        let novaListaCarros = carros.filter(item => item !== carro)
        setCarros(novaListaCarros)
    }

    function handleEditarCarro(carro) {
        setCarroSendoEditado(carro)
        setInputValue(carro)
        setEditando(true)
    }

    function handleButton() {
        if (editando) {
            editarCarro()
        } else {
            adicionarCarro()
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={styles.input}
                    mode='outlined'
                    label='Carro'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />


                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={handleButton}
                >
                    {editando ? 'Editar' : 'Adicionar'}
                </Button>

            </View>

            <FlatList
                style={styles.list}
                data={carros}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text style={styles.carroTitle}>{item}</Text>
                            <IconButton icon={() => <Icon name="edit" size={20} color="red" />} onPress={() => handleEditarCarro(item)} />
                            <IconButton icon={() => <Icon name="delete" size={20} color="red" />} onPress={() => excluirCarro(item)} />
                        </Card.Content>
                    </Card>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray', // Cor de fundo
    },
    inputContainer: {
        flexDirection: 'row',
        width: '95%',
        paddingTop: 10,
        marginBottom: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red', // Cor de fundo do botão
    },
    input: {
        flex: 4,
        fontSize: 16,
        backgroundColor: 'white', // Cor de fundo do input
    },
    list: {
        width: '95%',
        marginTop: 10,
    },
    card: {
        margin: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white', // Cor de fundo do card
    },
    carroTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
