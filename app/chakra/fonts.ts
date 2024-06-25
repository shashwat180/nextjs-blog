// app/fonts.ts
import { Raleway } from 'next/font/google'

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
})

export const fonts = {
  raleway,
}