import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["selector", "[data-mode='dark']", "class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			'bg-body': 'var(--bl-bg-body)',
  			'bg-surface': 'var(--bl-bg-surface)',
  			'bg-elevated': 'var(--bl-bg-elevated)',
  			'bg-active': 'var(--bl-bg-active)',
  			'bg-chrome': 'var(--bl-bg-chrome)',
  			'bg-well': 'var(--bl-bg-well)',
  			'bg-track': 'var(--bl-bg-track)',
  			'fg-primary': 'var(--bl-fg-primary)',
  			'fg-secondary': 'var(--bl-fg-secondary)',
  			'fg-muted': 'var(--bl-fg-muted)',
  			'fg-link': 'var(--bl-fg-link)',
  			'fg-on-primary': 'var(--bl-fg-on-primary)',
  			'border-divider': 'var(--bl-border-divider)',
  			'border-card': 'var(--bl-border-card)',
  			'border-active': 'var(--bl-border-active)',
  			'border-primary': 'var(--bl-border-primary)',
  			background: 'var(--bl-bg-body)',
  			foreground: 'var(--bl-fg-primary)',
  			card: {
  				DEFAULT: 'var(--bl-bg-surface)',
  				foreground: 'var(--bl-fg-primary)'
  			},
  			popover: {
  				DEFAULT: 'var(--bl-bg-surface)',
  				foreground: 'var(--bl-fg-primary)'
  			},
  			primary: {
  				DEFAULT: 'var(--bl-fill-primary)',
  				foreground: 'var(--bl-fg-on-primary)'
  			},
  			secondary: {
  				DEFAULT: 'var(--bl-bg-elevated)',
  				foreground: 'var(--bl-fg-primary)'
  			},
  			muted: {
  				DEFAULT: 'var(--bl-bg-active)',
  				foreground: 'var(--bl-fg-secondary)'
  			},
  			accent: {
  				DEFAULT: 'var(--bl-bg-active)',
  				foreground: 'var(--bl-fg-primary)'
  			},
  			destructive: {
  				DEFAULT: 'var(--bl-fill-danger)',
  				foreground: 'var(--bl-fg-on-primary)'
  			},
  			border: 'var(--bl-border-divider)',
  			input: 'var(--bl-border-divider)',
  			ring: 'var(--bl-border-primary)',
  			sidebar: {
  				DEFAULT: 'var(--bl-sidebar-bg)',
  				foreground: 'var(--bl-sidebar-fg)',
  				primary: 'var(--bl-sidebar-primary)',
  				'primary-foreground': 'var(--bl-sidebar-primary-fg)',
  				accent: 'var(--bl-sidebar-accent)',
  				'accent-foreground': 'var(--bl-sidebar-accent-fg)',
  				border: 'var(--bl-sidebar-border)',
  				ring: 'var(--bl-sidebar-ring)',
  			}
  		},
  		borderRadius: {
  			sm: 'var(--r-sm)',
  			DEFAULT: 'var(--r-md)',
  			md: 'var(--r-md)',
  			lg: 'var(--r-lg)',
  			xl: 'var(--r-xl)',
  			pill: 'var(--r-pill)'
  		},
  		fontFamily: {
  			heading: [
  				'Geist',
  				'system-ui',
  				'sans-serif'
  			],
  			body: [
  				'Satoshi',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'monospace'
  			]
  		},
  		fontSize: {
  			hero: [
  				'64px',
  				{
  					lineHeight: '1.05',
  					letterSpacing: '-0.03em'
  				}
  			],
  			section: [
  				'44px',
  				{
  					lineHeight: '1.1',
  					letterSpacing: '-0.025em'
  				}
  			],
  			h3: [
  				'24px',
  				{
  					lineHeight: '1.3',
  					letterSpacing: '-0.015em'
  				}
  			],
  			h4: [
  				'20px',
  				{
  					lineHeight: '1.4',
  					letterSpacing: '-0.01em'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '1.6'
  				}
  			],
  			label: [
  				'13px',
  				{
  					lineHeight: '1.4'
  				}
  			]
  		},
  		transitionDuration: {
  			instant: 'var(--dur-instant)',
  			quick: 'var(--dur-quick)',
  			medium: 'var(--dur-medium)',
  			slow: 'var(--dur-slow)'
  		},
  		transitionTimingFunction: {
  			out: 'var(--ease-out)',
  			in: 'var(--ease-in)',
  			'in-out': 'var(--ease-in-out)',
  			spring: 'var(--ease-spring)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [animatePlugin]
};

export default config;
