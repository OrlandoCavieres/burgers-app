import { render, fireEvent } from '@testing-library/vue'
import BurgerCard from '../components/BurgerCard.vue'


it('Tarjeta tiene un nombre para hamburguesa', async () => {
  const { getByText } = render(BurgerCard)
  getByText("Una Rica Hamburguesa")
})

it('Tarjeta deberia tener una imagen', async () => {
  const { queryByAltText, getByRole } = render(BurgerCard)

  queryByAltText("burgerImage")
  getByRole("img")
})

it('Tarjeta deberia tener un boton cuyo titulo es ELIMINAR', async () => {
  const { getByText, getByRole, container } = render(BurgerCard)

  getByText("ELIMINAR")
  expect(container.tagName).toBe('DIV')
  getByRole("button")
})

it('Al entregar un nombre como propiedad al componente, se renderiza correctamente', async () => {
  const { getByText, queryByText } = render(BurgerCard, {
    props: { nombre: 'ITALIANO' },
  })

  expect(getByText('ITALIANO')).toBeTruthy()
  expect(queryByText('INGLES')).toBeFalsy()
})

it('Al hacer click en el boton eliminar se ejecuta la función correspondiente dada por propiedades', async () => {
  let count = 0
  const { getByText } = render(BurgerCard, {
    props: { funcionEliminar: () => { count += 1 } }
  })

  expect(count).toEqual(0)
  await fireEvent.click(getByText('ELIMINAR'))
  expect(count).toEqual(1)
})

it('Al hacer click en la tarjeta se ejecuta la función correspondiente dada por propiedades solo 1 vez', async () => {
  let count = 0
  let info = ''
  const fnMostrarConfirm = jest.fn(() => info = 'Mostrando info')
  const { getByTestId } = render(BurgerCard, {
    props: { funcionEliminar: () => { count += 1 }, funcionMostrarConfirm: () => fnMostrarConfirm()}
  })

  expect(count).toEqual(0)
  expect(info).toEqual('')
  await fireEvent.click(getByTestId('TarjetaClick'))
  expect(fnMostrarConfirm).toBeCalledTimes(1)
  expect(count).toEqual(0)
  expect(count).not.toEqual(1)
  expect(info).not.toEqual('')
})