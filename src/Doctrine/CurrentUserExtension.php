<?php

namespace App\Doctrine;

use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    protected $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
        
    }
    private function addWhere(queryBuilder $queryBuilder, string $resourceClass){
        
         $customer=$this->security->getUser();
        if ($resourceClass===User::class && $customer instanceof Customer){
            $rootAlias=$queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.customer = :customer");
            $queryBuilder->setParameter("customer", $customer);
            
        }
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
       $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
