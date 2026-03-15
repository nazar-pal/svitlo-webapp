import { Button, Card } from '@heroui/react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Plus, Zap } from 'lucide-react'

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

      <div className="flex flex-col gap-1.5">
        {generators.map(gen => (
          <Link
            key={gen.id}
            to="/dashboard/$organizationId/generators/$generatorId"
            params={{ organizationId, generatorId: gen.id }}
            onClick={onNavigate}
            className="no-underline"
          >
            <Card className="border-default-200 hover:border-default-400 border transition-colors">
              <Card.Content className="flex items-center gap-3 px-3 py-2.5">
                <div className="bg-default-100 flex shrink-0 items-center justify-center rounded-md p-1.5">
                  <Zap size={14} className="text-default-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground m-0 truncate text-sm font-medium">
                    {gen.title}
                  </p>
                  <p className="text-default-400 m-0 truncate text-xs">
                    {gen.model}
                  </p>
                </div>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>

      <CreateGeneratorModal
        isOpen={modal === 'create-generator'}
        onClose={() => navigate({ to: '.', search: {} })}
      />
    </div>
  )
}
