import Image from 'next/image'

type Props = {
  className?: string
  priority?: boolean
}

export default function FocoDevLogo({ className = 'h-12 md:h-14 w-auto', priority = false }: Props) {
  const customUrl = process.env.NEXT_PUBLIC_LOGO_URL
  const src = customUrl && customUrl !== '/logo.png' ? customUrl : '/logo.svg'

  return (
    <Image
      src={src}
      alt="FocoDev Sistemas"
      width={240}
      height={56}
      className={`${className} transition-transform duration-300 group-hover:scale-105`}
      priority={priority}
    />
  )
}
