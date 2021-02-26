<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Customer;
use App\Entity\Phone;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    protected $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $admin = new Customer();
        $hash = $this->encoder->encodePassword($admin, 'password');
        $admin->setName('admin')
            ->setEmail('admin@bilemo.com')
            ->setPassword($hash)
            ->setRoles(['ROLE_ADMIN']);
        $manager->persist($admin);

        
        for ($c = 0; $c < 4; ++$c) {
            $customer = new Customer();
            $hash = $this->encoder->encodePassword($customer, 'password');
            $customer->setName("client".$c)
            ->setEmail("client".$c."@bilemo.com")
            ->setPassword($hash)
            ->setRoles(['ROLE_USER']);
            $manager->persist($customer);

            for ($u = 0; $u < 20; ++$u) {
                $user = new User();
                $user->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setCustomer($customer)
                ->setEmail($faker->email);
                $manager->persist($user);
            }
        }
        $brands = ['Motorola', 'Samsung', 'Apple', 'Sony', 'Huawei'];
        for ($b = 0; $b < 5; ++$b) {
            $brand = new Brand();
            $brand->setBrand($brands[$b]);
            $manager->persist($brand);

            for ($p = 0; $p < mt_rand(30, 50); ++$p) {
                $phone = new Phone();
                $phone->setBrand($brand)
                    ->setModel($faker->word(3))
                    ->setDescription($faker->sentence(15))
                    ->setCreateAt($faker->dateTimeBetween('-6 months'))
                    ->setAmount($faker->randomFloat(2, 49, 500));
                $manager->persist($phone);
            }
        }

        $manager->flush();
    }
}
