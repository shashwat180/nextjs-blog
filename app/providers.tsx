'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './chakra/theme'
import Layout from './components/Layout/Layout'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
  <RecoilRoot>
  <ChakraProvider theme={theme}>
    <Layout>{children}</Layout>
    </ChakraProvider>
    </RecoilRoot>
  );
}
