<template>
  <div class="">
	<!-- Topbar Start -->
	<div class="topbar">
		<div class="container">

			<!-- Top Left -->
			<div class="topleft">
				<ul>
					<li><a href="#">EN <i class="fas fa-caret-down"></i></a>
						<ul>
							<li><a href="#">RU</a></li>
							<li><a href="#">EN</a></li>
							<li><a href="#">FR</a></li>
							<li><a href="#">AU</a></li>
						</ul>
					</li>
					<li><a href="#">USD <i class="fas fa-caret-down"></i></a>
						<ul>
							<li><a href="#">AUS</a></li>
							<li><a href="#">YEN</a></li>
							<li><a href="#">INR</a></li>
						</ul>
					</li>
				</ul>
			</div>

			<!-- Top Center -->
			<div class="topcenter">
				<ul>
					<li><a href="#">Home</a></li>
					<li><a href="#">Company Profile</a></li>
					<li><a href="#">Payment Accept</a></li>
					<li><a href="#">Delivery</a></li>
					<li><a href="#">Contact Us</a></li>
				</ul>
			</div>

			<!-- Top Right -->
			<div class="topright">
				<ul>
					<li><a href="#"><i class="fas fa-phone"></i> +000(546)454545</a></li>
					<li><a href="#"><i class="fas fa-user"></i> My Profile <i class="fas fa-caret-down"></i></a>
						<ul class="myprofile-dropdown">
							<li><a href="#">My Order</a></li>
							<li><a href="#">My Wishlist</a></li>
							<li><a href="#">Pending Request</a></li>
							<li><a href="#">Delivered Order</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- Topbar End -->

	
	<!-- Header Start -->
	<div class="header">
		<div class="container">
			<div class="logo">
				<img src="../../public/assets/images/logo.png">
			</div>
			<div class="searchbar">
				<form>
					<input type="search" class="searchField" placeholder="Search for products & brands">
				</form>
			</div>
			<div class="headerright">
				<ul>
					<li><a href="#"><i class="fas fa-heart"></i> Wishlist</a></li>
					<li><a href="#"><i class="fas fa-shopping-cart"></i> Cart</a></li>
					<li><a href="#" class="signBtn">Login & Register</a></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- Header End -->

	<!-- Checkout Start -->
	<div class="checkout">
		<div class="container">
			<h2>Your Order</h2>

			<!-- Checkout Inner Start -->
			<div class="checkout-inner">
				<form>
					<div class="checkout-form-steps">
						<h4>Personal Detail</h4>
						<input type="text" class="textfield" placeholder="Your Name" required="">
						<input type="email" class="textfield" placeholder="Your Email">
						<input type="text" class="textfield" placeholder="Your Phone No.">
					</div>
					<div class="checkout-form-steps">
						<h4>Shipping Address</h4>
						<select class="textfield">
							<option>Select Country</option>
							<option>USA</option>
							<option>UK</option>
							<option>UAE</option>
						</select>
						<select class="textfield">
							<option>Select State</option>
							<option>State 1</option>
							<option>State 2</option>
							<option>State 3</option>
						</select>
						<input type="text" class="textfield" placeholder="Full Address">
					</div>
					<div class="checkout-form-steps">
						<h4>Shipping Options</h4>
						<label for="radio1">
							<input type="radio" name="shippingoptions" id="radio1">
							Delivery by courier - during the day free shipping
						</label>
						<label for="radio2">
							<input type="radio" name="shippingoptions" id="radio2">
							Urgent Delivery - delivery in 1 hour free shipping
						</label>
						<label for="radio3">
							<input type="radio" name="shippingoptions" id="radio3">
							Pickup - you can pickup 9AM to 8PM
						</label>
					</div>
					<div class="checkout-form-steps">
						<h4>Billing Options</h4>
						<label for="radio4">
							<input type="radio" name="billingoptions" id="radio4">
							In Cash
						</label>
						<label for="radio5">
							<input type="radio" name="billingoptions" id="radio5">
							Visa
						</label>
						<label for="radio6">
							<input type="radio" name="billingoptions" id="radio6">
							Mobile Banking
						</label>
						<label for="radio7">
							<input type="radio" name="billingoptions" id="radio7">
							Wallet
						</label>
					</div>
					<input type="submit" class="submitorder-button" value="Submit Order">
				</form>
			</div>
			<!-- Checkout Inner End -->
			
			
			<!-- Order List Start-->
			<div class="orderlist">
				<img src="../../public/assets/images/2_tb.jpg">
				<h3>Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
				<p>Quantity : <span>1</span></p>
				<p>Price : <span><i class="fas fa-dollar-sign"></i> 1099</span></p>
				<input type="text" class="textfield" placeholder="Promo Code : STORE8888">
				<input type="submit" class="applycode-button" value="Apply Promo Code">
				<p>Order Total : <span><i class="fas fa-dollar-sign"></i> 1099</span></p>
			</div>
			<!-- Order List End-->

		</div>
	</div>
	<!-- Checkout End -->
	


	
	<!-- Footer Start -->
	<div class="footer">
		<div class="container">
			<div class="col-3">
				<p><big>Address UK:</big><br>Adipisci cum reprehenderit asperiores perferendis amet.</p>
				<p><big>Address US:</big><br>Ipsum repellat pariatur totam voluptas asperiores</p>
				<p><big>Address UAE:</big><br>Reprehenderit asperiores perferendis asperiores.</p>
			</div>
			<div class="col-3">
				<ul>
					<li><a href="#">Contact Anywhere</a></li>
					<li><a href="#">Easy payment Method</a></li>
					<li><a href="#">Fast Shipping</a></li>
					<li><a href="#">Our New Brand</a></li>
					<li><a href="#">Catalog</a></li>
				</ul>
			</div>
			<div class="col-3">
				<ul>
					<li><a href="#">About us</a></li>
					<li><a href="#">Jobs</a></li>
					<li><a href="#">Corpoprative Clients</a></li>
					<li><a href="#">Our Partner</a></li>
					<li><a href="#">Terms of use</a></li>
					<li><a href="#">Advertise with us</a></li>
					<li><a href="#">Compare bank</a></li>
				</ul>
			</div>
			<div class="col-3">
				<ul>
					<li><a href="#">Warranty</a></li>
					<li><a href="#">Check in</a></li>
					<li><a href="#">How to place order</a></li>
					<li><a href="#">Exchange and return</a></li>
					<li><a href="#">Installation</a></li>
					<li><a href="#">Quality of services</a></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- Footer End -->

	
	<div class="copyright">
		<div class="container">
			<h5>&copy; 2019 eshopstore.com | Creator by johnsom</h5>
		</div>
	</div>

	
	<!-- Login Signup Form Start -->
	<div class="loginBox">
		<div class="closeBtn"><i class="fas fa-times"></i></div>
		<div class="loginForm">
			<h3>Login Form</h3>
			<form>
				<input class="textField" type="text" placeholder="Username or Email">
				<input class="textField" type="password" placeholder="Password">
				<input class="submitBtn" type="submit" value="Login">
			</form>
		</div>
		<div class="registerForm">
			<h3>Register Form</h3>
			<form>
				<input class="textField" type="text" placeholder="First Name">
				<input class="textField" type="text" placeholder="Last Name">
				<input class="textField" type="email" placeholder="Your Email">
				<input class="textField" type="password" placeholder="New Password">
				<input class="textField" type="password" placeholder="Confirm Password">
				<input class="submitBtn" type="submit" value="Register">
			</form>
		</div>
	</div>
	<!-- Login Signup Form End -->

	
	<!-- Product View Box / Quick Product View Start -->
	<div class="productViewBox">
		<h3>Apple Macbook Pro MQ032 14.5' Inter Core i7 5550U 8GB DDR3</h3>
		<div class="productViewBox-closeBtn"><i class="fas fa-times"></i></div>
		<div class="productViewBoxImg">
			<img src="../../public/assets/images/img1.jpg">
		</div>
		<div class="productViewBoxDetail">
			<h5><b>Price : </b> <i class="fas fa-dollar-sign"></i> 598</h5>
			<h5><b>Brand : </b> Apple</h5>
			<h5><b>Warranty : </b> 12 Months</h5>
			<h5><b>Delivery of the city : </b> Free</h5>
			<h5><b>Payment : </b> COD, Visa, Mastercard, Debit, Credit, Installation</h5>
			<h5><b>Availability : </b> in Stock</h5>
			<h5><b>Product Code : </b> GA000006488</h5>
			<a href="#" class="addtocart"><i class="fas fa-heart"></i> Add to Cart</a>
			<a href="#" class="writereview"><i class="fas fa-pen"></i> Write a review</a>
			<a href="#" class="buynow"><i class="fas fa-shopping-cart"></i> Buy Now</a>
		</div>
	</div>
	<!-- Product View Box / Quick Product View End -->

  </div>
</template>

<script>
export default {
  name: "Checkout",
  components: {
  }
};
</script>

<style scoped lang="scss">

</style>
