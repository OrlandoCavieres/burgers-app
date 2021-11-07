import { mount, flushPromises } from '@vue/test-utils'
import Burgers from '../views/Burgers.vue'
import axios from 'axios'

jest.useFakeTimers()

const mockList = [
  {
    id: 1,
    nombre: 'Rodeo',
    calorias: 20,
    ingredientes: ['cebolla', 'queso', 'salsa BBQ']
  },
  {
    id: 2,
    nombre: 'Italiana',
    calorias: 100,
    ingredientes: ['tomate', 'palta', 'mayonesa']
  }
]

const newBurger = {
  id: 3,
  nombre: 'Alemana',
  calorias: 80,
  ingredientes: ['queso', 'champiñones', 'cebolla']
}

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: mockList })),
    delete: jest.fn(() => Promise.resolve({ data: 'exito' })),
    post: jest.fn(() => Promise.resolve({ data: newBurger }))
  }
}))


it('Renderiza correctamente despues de llamar a axios una vez con metodo get para mostrar lista', async () => {
  const wrapper = mount(Burgers)

  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).not.toHaveBeenCalledTimes(3)

  await flushPromises()

  const burgers = wrapper.vm.burgers
  const burgers_filter = wrapper.vm.burgers_filtered
  expect(burgers.length).toBe(2)
  expect(burgers_filter.length).toBe(2)
})

it('Los controles de visibilidad de modales se establecen como ocultos inicialmente de forma correcta', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.showDeleteModal).toBeFalsy()
  expect(wrapper.vm.showCreateModal).toBeFalsy()
  expect(wrapper.vm.showInfoModal).toBeFalsy()
})

it('El input de búsqueda funciona correctamente al ser modificado y buscar filtra la lista de burgers', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.searchText).toBe('')

  const textInput = wrapper.find('input')
  expect(textInput.element.value).toBe('')

  await textInput.setValue('Italiana')
  expect(textInput.element.value).toBe('Italiana')
  expect(wrapper.vm.searchText).toBe('Italiana')
  expect(wrapper.vm.searchText).not.toBe('Alemana')

  const buttonSearch = wrapper.find('#RealizarBusqueda')
  expect(buttonSearch).not.toBeNull()

  await buttonSearch.trigger('click')
  expect(wrapper.vm.burgers_filtered.length).toBe(1)
  expect(wrapper.vm.burgers_filtered.length).not.toBe(2)
  expect(wrapper.vm.burgers.length).toBe(2)
  expect(wrapper.vm.burgers_filtered[0].nombre).toBe('Italiana')
})

it('Al intentar eliminar una hamburguesa se abre el modal de confirmacion', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  await wrapper.vm.deleteBurger(wrapper.vm.burgers[1])
  expect(wrapper.vm.showDeleteModal).toBeTruthy()
  expect(wrapper.vm.lastIndexToDelete).toBe(1)
})

it('Si el usuario cancela la eliminacion se esconde el modal sin realizar eliminacion alguna', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.showDeleteModal).toBeFalsy()
  await wrapper.vm.deleteBurger(wrapper.vm.burgers[1])
  expect(wrapper.vm.showDeleteModal).toBeTruthy()
  await wrapper.vm.cancelDelete()
  expect(wrapper.vm.showDeleteModal).toBeFalsy()
})

it('Si el usuario confirma la eliminacion se esconde el modal, y se elimina la hamburguesa de la lista general', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.showDeleteModal).toBeFalsy()
  await wrapper.vm.deleteBurger(wrapper.vm.burgers[1])
  expect(wrapper.vm.showDeleteModal).toBeTruthy()

  const lastIndex = wrapper.vm.lastIndexToDelete
  expect(lastIndex).toBe(1)
  expect(wrapper.vm.burgers[lastIndex]).toStrictEqual(mockList[lastIndex])

  await wrapper.vm.confirmDelete()
  const lastIndexAfterDelete = wrapper.vm.lastIndexToDelete
  expect(axios.delete).toBeCalledTimes(1)
  expect(lastIndexAfterDelete).toBe(1)
  expect(wrapper.vm.burgers.length).toBe(1)
  expect(wrapper.vm.showDeleteModal).toBeFalsy()
})

it('Si el usuario hace click en la tarjeta se muestra modal de informacion y si hace click en cerrar se oculta', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.showInfoModal).toBeFalsy()
  await wrapper.vm.showInfo(wrapper.vm.burgers[1])
  expect(wrapper.vm.showInfoModal).toBeTruthy()
  expect(wrapper.vm.actualBurger).toStrictEqual(wrapper.vm.burgers[1])
  await wrapper.vm.closeInfoModal()
  expect(wrapper.vm.showInfoModal).toBeFalsy()
})

it('Si el usuario hace click en el boton agregar nueva hamburguesa se muestra el modal de creacion', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  expect(wrapper.vm.showCreateModal).toBeFalsy()
  await wrapper.vm.openCreateModal()
  expect(wrapper.vm.showCreateModal).toBeTruthy()
})

it('En el modal de creacion el usuario hace click en la X para salir, entonces el modal se oculta', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  wrapper.vm.showCreateModal = true
  await wrapper.vm.closeCreateModal()
  expect(wrapper.vm.showCreateModal).toBeFalsy()
})

it('Al confirmar la creacion de una hamburguesa, se procesan los datos y se agrega correctamente a la lista', async () => {
  const wrapper = mount(Burgers)
  await flushPromises()

  wrapper.vm.showCreateModal = true
  await wrapper.vm.postNewBurgerData(newBurger)
  expect(axios.post).toBeCalledTimes(1)
  expect(wrapper.vm.burgers.length).toBe(3)
  expect(wrapper.vm.burgers[2]).toStrictEqual(newBurger)
  expect(wrapper.vm.showCreateModal).toBeFalsy()
})