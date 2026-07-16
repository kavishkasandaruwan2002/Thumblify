import React from 'react'
import { colorSchemes } from '../assets/assets'

export default function ColorSchemeSelector({
    value,
    onChange,
}: {
    value: string
    onChange: (id: string) => void
}) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-200">
                Color Theme
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {colorSchemes.map((scheme) => {
                    const selected = value === scheme.id

                    return (
                        <button
                            key={scheme.id}
                            type="button"
                            onClick={() => onChange(scheme.id)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-2 transition cursor-pointer text-center ${
                                selected
                                    ? 'bg-pink-600/20 border-pink-500 text-white'
                                    : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
                            }`}
                        >
                            <div className="flex gap-1">
                                {scheme.colors.slice(0, 3).map((color, idx) => (
                                    <span
                                        key={idx}
                                        className="w-3 h-3 rounded-full border border-black/40"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <span className="text-[11px] font-medium tracking-wide">{scheme.name}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
