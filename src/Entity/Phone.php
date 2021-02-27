<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\PhoneRepository;
use Gedmo\Mapping\Annotation as Gedmo;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=PhoneRepository::class)
 * @ApiResource(
 *  
 *  collectionOperations={
 *      "GET"
 *  },
 *  itemOperations={"GET"},
 *  subresourceOperations={
 *      "api_brand_phones_get_subresource"={
 *          "normalization_context"={"groups"={"brands_subresource"}}
 *      }
 * },
 *  normalizationContext={
 *      "groups"={"phone_list"}
 *  },
 *  attributes={
 *      "order":{"amount": "desc"}       
 * }
 * )
 * @ApiFilter(SearchFilter::class,properties={"model":"partial"})
 * 
 */
class Phone
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"phone_list"})
     */
    private $id;

    /**
     * 
     * @ORM\Column(type="string", length=255)
     * @Groups({"phone_list"})
     */
    private $model;

    /**
     * 
     * 
     * @ORM\Column(type="float")
     * @Groups({"phone_list"})
     */
    private $amount;

    /**
     * @var \DateTime
     * @Gedmo\Timestampable(on="create")
     * @ORM\Column(type="datetime")
     * @Groups({"phone_list"})
     */
    private $createAt;

    /**
     * @ORM\Column(type="text")
     * @Groups({"phone_list"})
     * 
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=Brand::class, inversedBy="phones")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"phone_list"})
     */
    private $brand;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModel(): ?string
    {
        return $this->model;
    }

    public function setModel(string $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }
}
