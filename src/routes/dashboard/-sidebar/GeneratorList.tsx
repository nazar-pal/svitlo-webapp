import { Button } from '@heroui/react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { getGeneratorsByOrg } from '@/data/client/queries/generators'
import { useDrizzleQuery } from '@/lib/hooks/use-drizzle-query'
import CreateGeneratorModal from './CreateGeneratorModal'

interface GeneratorListProps {
  organizationId: string | undefined
  isAdmin: boolean
  onNavigate?: () => void
}

export default function GeneratorList({
  organizationId,
  isAdmin,
  onNavigate
}: GeneratorListProps) {
  const { modal } = useSearch({ from: '/dashboard' })
  const navigate = useNavigate()

  const { data: generators } = useDrizzleQuery(
    organizationId ? getGeneratorsByOrg(organizationId) : undefined
  )

  if (!organizationId) return null

  return (
    <div className="px-2 pb-2">
      <div className="flex items-center justify-between px-2 py-2">
        <p className="text-muted m-0 text-xs font-medium tracking-wider uppercase">
          Generators
        </p>
        <Button
          size="sm"
          isIconOnly
          variant="ghost"
          isDisabled={!isAdmin}
          onPress={() =>
            navigate({ to: '.', search: { modal: 'create-generator' } })
          }
          aria-label="Create generator"
        >
          <Plus size={14} />
        </Button>
      </div>

      {generators.map(gen => (
        <Link
          key={gen.id}
          to="/dashboard/$organizationId/generators/$generatorId"
          params={{ organizationId, generatorId: gen.id }}
          onClick={onNavigate}
          className="text-foreground hover:bg-default-100 block truncate rounded-lg px-3 py-2 text-sm no-underline"
        >
          {gen.title}
        </Link>
      ))}

      <CreateGeneratorModal
        isOpen={modal === 'create-generator'}
        onClose={() => navigate({ to: '.', search: {} })}
      />
    </div>
  )
}
